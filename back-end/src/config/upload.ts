import slugify from '@shared/util/slug'
import multer, { StorageEngine } from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 's3' | 'disk'

  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: {}
    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, cb) => {
        // const fileHash = crypto.randomBytes(10).toString('hex');
        const fileHash = uuidv4()
        // const p = slugify(file.originalname);
        const ext = file.originalname.slice(
          ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2,
        )
        const name = file.originalname.split(`.${ext}`)[0]

        const fileName = `${fileHash}-${slugify(name)}.${ext}`.trim()

        return cb(null, fileName)
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.BUCKET_NAME,
    },
  },
} as IUploadConfig
