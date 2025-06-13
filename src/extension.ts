import * as vscode from "vscode";
import { DateTimeToolInput, DateTimeResult } from "./types";

class GetDateTimeTool implements vscode.LanguageModelTool<DateTimeToolInput> {
  private getConfig() {
    const config = vscode.workspace.getConfiguration("getDateTime");
    return {
      defaultTimezone: config.get<string>("defaultTimezone") || "",
      defaultLocale: config.get<string>("defaultLocale") || "",
    };
  }

  async prepareInvocation(
    options: vscode.LanguageModelToolInvocationPrepareOptions<DateTimeToolInput>,
    _token: vscode.CancellationToken
  ) {
    const config = this.getConfig();
    const format = options.input?.format || "local";
    const timezone = options.input?.timezone || config.defaultTimezone;

    let messageText = `Get the current date and time`;
    if (format !== "local") {
      messageText += ` in **${format}** format`;
    }
    if (timezone) {
      messageText += ` for timezone **${timezone}**`;
    }
    messageText += "?\n\n";

    // Add example output with configured defaults
    const locale = config.defaultLocale || undefined;
    const exampleDate = new Date();
    let exampleOutput = timezone
      ? exampleDate.toLocaleString(locale, { timeZone: timezone })
      : exampleDate.toLocaleString(locale);

    messageText += `**Example output:**\n\`\`\`\nCurrent date and time: ${exampleOutput}`;
    if (timezone) {
      messageText += ` (${timezone})`;
    }
    messageText += `\nTimestamp: ${Date.now()}\nFormat: ${format}\n\`\`\``;

    // Show configured defaults if any
    if (config.defaultTimezone || config.defaultLocale) {
      messageText += `\n**Configured defaults:**`;
      if (config.defaultTimezone) {
        messageText += `\n- Timezone: ${config.defaultTimezone}`;
      }
      if (config.defaultLocale) {
        messageText += `\n- Locale: ${config.defaultLocale}`;
      }
    }

    const confirmationMessages = {
      title: "Get Current Date and Time",
      message: new vscode.MarkdownString(messageText),
    };

    return {
      invocationMessage: "Getting current date and time...",
      confirmationMessages,
    };
  }

  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<DateTimeToolInput>,
    token: vscode.CancellationToken
  ): Promise<vscode.LanguageModelToolResult> {
    if (token.isCancellationRequested) {
      return { content: [new vscode.LanguageModelTextPart("Operation cancelled")] };
    }

    const input = options.input || {};
    const config = this.getConfig();
    const format = input.format || "local";
    const timezone = input.timezone || config.defaultTimezone;

    const now = new Date();
    let formattedDateTime: string;
    let actualTimezone: string | undefined = timezone;

    try {
      switch (format) {
        case "iso":
          formattedDateTime = now.toISOString();
          actualTimezone = "UTC";
          break;
        case "utc":
          formattedDateTime = now.toUTCString();
          actualTimezone = "UTC";
          break;
        case "timestamp":
          formattedDateTime = now.getTime().toString();
          actualTimezone = undefined;
          break;
        case "relative":
          formattedDateTime = this.getRelativeTime(now);
          actualTimezone = undefined;
          break;
        case "local":
        default:
          if (timezone) {
            const locale = config.defaultLocale || undefined;
            formattedDateTime = now.toLocaleString(locale, { timeZone: timezone });
            actualTimezone = timezone;
          } else {
            const locale = config.defaultLocale || undefined;
            formattedDateTime = now.toLocaleString(locale);
            actualTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          }
          break;
      }

      const result: DateTimeResult = {
        datetime: formattedDateTime,
        format: format,
        timezone: actualTimezone,
        timestamp: now.getTime(),
      };

      const resultText =
        `Current date and time: ${result.datetime}` +
        (result.timezone ? ` (${result.timezone})` : "") +
        `\nTimestamp: ${result.timestamp}` +
        `\nFormat: ${result.format}`;

      return {
        content: [new vscode.LanguageModelTextPart(resultText)],
      };
    } catch (error) {
      return {
        content: [
          new vscode.LanguageModelTextPart(
            `Error getting date/time: ${error instanceof Error ? error.message : "Unknown error"}`
          ),
        ],
      };
    }
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (Math.abs(diffMs) < 1000) {
      return "just now";
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (Math.abs(diffDays) > 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} ${diffDays > 0 ? "ago" : "from now"}`;
    } else if (Math.abs(diffHours) > 0) {
      return `${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? "s" : ""} ${diffHours > 0 ? "ago" : "from now"}`;
    } else if (Math.abs(diffMins) > 0) {
      return `${Math.abs(diffMins)} minute${Math.abs(diffMins) !== 1 ? "s" : ""} ${diffMins > 0 ? "ago" : "from now"}`;
    } else {
      return `${Math.abs(diffSecs)} second${Math.abs(diffSecs) !== 1 ? "s" : ""} ${diffSecs > 0 ? "ago" : "from now"}`;
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Show activation message
  // vscode.window.showInformationMessage("Get DateTime extension is now active! 🕐");

  // Register the datetime tool
  const datetimeTool = vscode.lm.registerTool("get-datetime", new GetDateTimeTool());
  context.subscriptions.push(datetimeTool);

  // Confirm tool registration
  //console.log("✅ get-datetime tool registered successfully");
}

export function deactivate() {}
