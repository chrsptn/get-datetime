# Release Notes - Get DateTime Extension

## Version 0.2.1 - 12/06/2025

Released on **12/06/2025, 17:37:49 (Australia/Sydney)**

### ✨ Enhancements

- **Extension Icon**: Added a new icon for the extension, improving visibility in the VS Code marketplace and activity bar.
- **Improved README**: The README.md file has been significantly updated with a more user-focused approach, including:
  - Clearer installation instructions.
  - More comprehensive usage examples.
  - A new screenshot demonstrating the extension in action.
  - Better overall structure and readability for end-users.
- **Build Process**: Minor internal improvements to the build and packaging process.

### 🔧 Technical Improvements

- Cleaned SVG icon file, removing unnecessary metadata.
- Updated versioning in `package.json`.

### 📦 Packaging

- Packaged as `get-datetime-0.2.1.vsix`.

---

## Version 0.2.0 - 12/06/2025

Released on **12/06/2025, 14:58:41 (Australia/Sydney)**

### 🎉 New Features

**User-Configurable Settings**

- Added support for custom default timezone and locale preferences
- New VS Code settings:
  - `getDateTime.defaultTimezone` - Set your preferred timezone (e.g., "Australia/Sydney", "America/New_York", "Europe/London")
  - `getDateTime.defaultLocale` - Set your preferred locale format (e.g., "en-GB", "en-AU", "fr-FR", "de-DE")

**Auto-Detected Locale Support**

- Extension now automatically detects your system locale instead of using hardcoded "en-US"
- Provides more accurate date/time formatting based on your regional settings

**Enhanced User Experience**

- Improved confirmation dialogs that show your configured defaults
- Better preview of expected output format before execution
- Clear indication when custom settings are being used

### 🔧 Technical Improvements

- Refactored configuration management with centralized `getConfig()` method
- Improved TypeScript type safety for configuration options
- Updated build process to include new configuration features
- Enhanced error handling for invalid timezone/locale combinations

### 📖 Usage Examples

**Configure default settings in VS Code:**

```json
{
  "getDateTime.defaultTimezone": "Australia/Sydney",
  "getDateTime.defaultLocale": "en-AU"
}
```

**Use with GitHub Copilot:**

- `#get-datetime` - Uses your configured defaults
- `#get-datetime format:iso` - Override format while keeping your timezone/locale
- `#get-datetime timezone:UTC` - Override timezone for this request

### 🔄 Migration Notes

- Existing functionality remains unchanged - no breaking changes
- New settings are optional - extension works without configuration
- Previous behavior is preserved for users who don't set custom defaults

### 🐛 Bug Fixes

- Fixed hardcoded "en-US" locale usage
- Improved timezone detection accuracy
- Better handling of edge cases in relative time calculations

---

**Installation:** Install from VSIX file `get-datetime-0.2.0.vsix` or update through VS Code Extensions marketplace.

**Previous Versions:**

- [v0.1.0 Release Notes](#version-010---initial-release)
- [v0.0.1 Release Notes](#version-001---beta)

---

## Version 0.1.0 - Initial Release

### 🚀 Initial Features

**Core Functionality**

- Language Model Tool integration for GitHub Copilot
- Multiple datetime formats: local, ISO, UTC, timestamp, relative
- Automatic timezone detection
- Rich confirmation dialogs with examples

**Supported Formats**

- `local` - Your system's local date/time format
- `iso` - ISO 8601 standard format
- `utc` - UTC string format
- `timestamp` - Unix timestamp (milliseconds)
- `relative` - Human-readable relative time

**GitHub Copilot Integration**

- Use `#get-datetime` in Copilot conversations
- Parameter support for custom formats and timezones
- Seamless integration with VS Code's Language Model API

### 🛠️ Technical Details

- Built with TypeScript and esbuild
- Follows VS Code extension development best practices
- Comprehensive error handling and user feedback
- Lightweight and performant implementation

---

## Version 0.0.1 - Beta

Initial beta release for testing and feedback.

**Beta Features:**

- Basic datetime retrieval functionality
- Simple format options
- Initial GitHub Copilot integration

---

_For technical support or feature requests, please visit the project repository or VS Code Extensions marketplace._
