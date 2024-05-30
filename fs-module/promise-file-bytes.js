// Import the Promise-based version of fs
const fs = require('fs').promises;

// Allocate a Buffer size of 1024 Bytes
// as a reliable read & write & send over Web Sockets
const buffer = Buffer.alloc(1024);
const file = './test.txt';

async function readFile() {
    // Prepare to store File Descriptor
    let fd;
    
    try {
        // Step 1: Open the File
        fd = await fs.open(file, 'r');

        // Step 2: Read from the File
        const { 
            bytesRead, 
            buffer: buf 
        } = await fd.read(buffer, 0, buffer.length, null);
        
        console.log(`Number of Bytes read:\n${bytesRead}`);
        console.log(`\n`);
        console.log(`Data read:\n${buf.slice(0, bytesRead).toString()}`);
        console.log(`\n`);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        // Step 3: Close the File (if it was opened)
        if (fd) {
            await fd.close()
            .then(() => {
                return console.log(`File successfully closed`);
            })
            .catch(err => {
                return console.error(`Error closing file: ${err}`);
            })
        }
    }
}

// Trigger the Callback
readFile();