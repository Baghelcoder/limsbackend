require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const { exec } = require("child_process");

// Load Google Drive credentials
const KEYFILEPATH = path.join(__dirname, "google_drive.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// Database credentials from .env
const DB_NAME = process.env.db_name || "limsprojectdata";
const DB_USER = process.env.db_username || "yogesh@123";
const DB_PASSWORD = process.env.db_password || "your_db_password";
const BACKUP_DIR = path.join(__dirname, "db_backups");
const FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID"; // Replace with your folder ID

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Generate backup filename
const TIMESTAMP = new Date().toISOString().replace(/:/g, "-");
const BACKUP_FILE = path.join(BACKUP_DIR, `db_backup_${TIMESTAMP}.sql`);

// Function to create MySQL backup
function createBackup() {
    console.log("Starting database backup...");
    const dumpCommand = `mysqldump -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${BACKUP_FILE}`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating backup: ${error.message}`);
            return;
        }
        console.log("Database backup created successfully.");
        uploadToDrive(BACKUP_FILE);
    });
}

// Function to upload to Google Drive
async function uploadToDrive(filePath) {
    console.log("Uploading backup to Google Drive...");
    const fileMetadata = {
        name: path.basename(filePath),
        parents: [FOLDER_ID],
    };

    const media = {
        mimeType: "application/sql",
        body: fs.createReadStream(filePath),
    };

    try {
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id",
        });

        console.log(`Backup uploaded successfully! File ID: ${response.data.id}`);
    } catch (error) {
        console.error("Error uploading backup:", error);
    }
}

// Run backup function
createBackup();