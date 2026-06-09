const fs = require('fs').promises;
const path = require('path');

async function renameFilesByModificationDate(folderPath) {
    try {
        // Check if folder exists
        await fs.access(folderPath);
        
        // Read all files in the directory
        const files = await fs.readdir(folderPath);
        
        console.log(`Found ${files.length} items in directory: ${folderPath}`);
        
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            
            try {
                // Get file stats
                const stats = await fs.stat(filePath);
                
                // Skip directories
                if (stats.isDirectory()) {
                    console.log(`Skipping directory: ${file}`);
                    continue;
                }
                
                // Get modification time
                const modDate = stats.mtime;
                
                // Format date as YYYYMMDD_HHMMSS
                const year = modDate.getFullYear();
                const month = String(modDate.getMonth() + 1).padStart(2, '0');
                const day = String(modDate.getDate()).padStart(2, '0');
                const hours = String(modDate.getHours()).padStart(2, '0');
                const minutes = String(modDate.getMinutes()).padStart(2, '0');
                const seconds = String(modDate.getSeconds()).padStart(2, '0');
                
                const dateString = `${year}${month}${day}_${hours}${minutes}${seconds}`;
                
                // Get file extension
                const fileExtension = path.extname(file);
                
                // Create new filename
                let newFileName = `${dateString}${fileExtension}`;
                let newFilePath = path.join(folderPath, newFileName);
                
                // Handle duplicate names by adding a counter
                let counter = 1;
                while (true) {
                    try {
                        await fs.access(newFilePath);
                        // File exists, try with counter
                        newFileName = `${dateString}_${counter}${fileExtension}`;
                        newFilePath = path.join(folderPath, newFileName);
                        counter++;
                    } catch {
                        // File doesn't exist, we can use this name
                        break;
                    }
                }
                
                // Skip if the file already has the correct name
                if (file === newFileName) {
                    console.log(`Skipping ${file} - already has correct name`);
                    continue;
                }
                
                // Rename the file
                await fs.rename(filePath, newFilePath);
                console.log(`Renamed: ${file} → ${newFileName}`);
                
            } catch (error) {
                console.error(`Error processing file ${file}:`, error.message);
            }
        }
        
        console.log('\nRenaming completed!');
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: Directory "${folderPath}" does not exist.`);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Get folder path from command line arguments
const folderPath = process.argv[2];

if (!folderPath) {
    console.log('Usage: node rename-files.js <folder-path>');
    console.log('Example: node rename-files.js ./my-folder');
    process.exit(1);
}

// Run the script
renameFilesByModificationDate(folderPath);
