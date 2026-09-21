import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { ApiError } from "../utils/apiError.js";

// Local disk storage, not cloud (S3/etc.) — a deliberate choice for this stage:
// this is a learning project with no cloud storage configured, and local is
// the right default until that's actually needed. Swapping to S3 later only
// touches this file (destination/filename become an upload() call instead),
// not the schema, the API shape, or any calling code.
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "room-types");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    // never trust the client's original filename — a random name avoids both
    // collisions and path-injection from something like "../../etc/passwd.jpg"
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
    return cb(new ApiError(400, "Only JPG or PNG images are allowed"));
  }
  cb(null, true);
}

// UC-A05.1: "up to 10 photos ... up to 5 MB each" — fileSize caps each file,
// `files` caps how many multer accepts in one request (the 10-total-per-type
// check, including photos already on the room type, happens in the controller,
// since multer has no idea how many already exist in the database).
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

export { upload, UPLOAD_DIR };
