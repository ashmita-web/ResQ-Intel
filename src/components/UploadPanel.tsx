import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Loader
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadItem {
  id: string;
  name: string;
  type: 'satellite' | 'drone' | 'social';
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  size: string;
}

const UploadPanel = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const fileInputRefs = {
    satellite: useRef<HTMLInputElement>(null),
    drone: useRef<HTMLInputElement>(null),
    social: useRef<HTMLInputElement>(null)
  };

  const handleFileUpload = (type: 'satellite' | 'drone' | 'social', files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const uploadItem: UploadItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type,
        status: 'uploading',
        progress: 0,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      };

      setUploads(prev => [uploadItem, ...prev]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploads(prev => prev.map(item => {
          if (item.id === uploadItem.id) {
            if (item.progress < 100) {
              return { ...item, progress: Math.min(100, item.progress + Math.random() * 15) };
            } else if (item.status === 'uploading') {
              return { ...item, status: 'processing' };
            } else if (item.status === 'processing') {
              return { ...item, status: 'completed' };
            }
          }
          return item;
        }));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setUploads(prev => prev.map(item => 
          item.id === uploadItem.id 
            ? { ...item, status: 'completed', progress: 100 }
            : item
        ));
        toast.success(`${file.name} processed successfully!`);
      }, 5000);
    });
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(item => item.id !== id));
  };

  const uploadTypes = [
    {
      type: 'satellite' as const,
      title: 'Satellite Imagery',
      icon: Image,
      accept: 'image/*',
      description: 'Upload satellite images for damage assessment'
    },
    {
      type: 'drone' as const,
      title: 'Drone Footage',
      icon: Video,
      accept: 'video/*',
      description: 'Upload drone videos for detailed analysis'
    },
    {
      type: 'social' as const,
      title: 'Social Media Data',
      icon: FileText,
      accept: '.csv,.txt,.json',
      description: 'Upload social media content or CSV files'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Data Ingestion</h2>
      
      {/* Upload Sections */}
      {uploadTypes.map((uploadType) => {
        const Icon = uploadType.icon;
        return (
          <div key={uploadType.type} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <Icon className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-white">{uploadType.title}</h3>
                <p className="text-xs text-gray-400">{uploadType.description}</p>
              </div>
            </div>
            
            <div
              onClick={() => fileInputRefs[uploadType.type].current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors group"
            >
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                Click to upload or drag files here
              </p>
            </div>
            
            <input
              ref={fileInputRefs[uploadType.type]}
              type="file"
              accept={uploadType.accept}
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(uploadType.type, e.target.files)}
            />
          </div>
        );
      })}

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h3 className="font-medium text-white mb-3">Upload Status</h3>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <AnimatePresence>
              {uploads.map((upload) => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-700 p-3 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {upload.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : upload.status === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Loader className="w-4 h-4 text-blue-400 animate-spin" />
                      )}
                      <span className="text-sm font-medium text-white truncate">
                        {upload.name}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => removeUpload(upload.id)}
                      className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="capitalize">{upload.status}</span>
                    <span>{upload.size}</span>
                  </div>
                  
                  {upload.status !== 'completed' && upload.status !== 'error' && (
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPanel;