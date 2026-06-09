# Rename Files by Date

A simple Node.js utility to batch rename all files in a folder based on their modification date.

## Description

This script automatically renames files using their last modification timestamp in the format `YYYYMMDD_HHMMSS`. It's useful for organizing files, archiving data, or ensuring consistent file naming conventions based on when files were last modified.

## Features

- **Automatic renaming** based on file modification date
- **Timestamp format**: `YYYYMMDD_HHMMSS` (e.g., `20250706_125923`)
- **Preserves file extensions** (.txt, .pdf, .jpg, etc.)
- **Handles duplicates** by automatically appending a counter suffix
- **Skips directories** - only processes files
- **Detailed logging** - shows progress and results
- **Error handling** - gracefully handles missing files and permission issues

## Installation

Clone the repository or download the script:

```bash
git clone https://github.com/yourusername/rename-files-by-date.git
cd rename-files-by-date
```

## Requirements

- Node.js (v12 or higher)

## Usage

Run the script from the command line with a target folder path:

```bash
node rename-files-by-date.js <folder-path>
```

### Examples

Rename files in the current directory:
```bash
node rename-files-by-date.js ./
```

Rename files in a specific folder:
```bash
node rename-files-by-date.js ./my-documents
```

Rename files using an absolute path:
```bash
node rename-files-by-date.js /home/user/downloads
```

## Output Example

```
Found 5 items in directory: ./samples
Renamed: document.txt → 20250706_125923.txt
Renamed: photo.jpg → 20250705_143000.jpg
Renamed: report.pdf → 20250704_091530.pdf
Skipping directory: subfolder
Skipping data.csv - already has correct name

Renaming completed!
```

## How It Works

1. Reads all files in the specified directory
2. Gets the modification date for each file
3. Formats the date as `YYYYMMDD_HHMMSS`
4. Renames the file while preserving its extension
5. Handles duplicate timestamps by adding a counter

## License

MIT License - feel free to use this project for personal or commercial purposes.
