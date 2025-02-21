import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Notification = ({ message, onClose, color = "green" }) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className={`fixed bottom-4 right-0 sm:right-4 bg-gradient-to-r from-${color}-500 to-${color}-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm w-full sm:w-auto`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium mr-8">{message}</p>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                            aria-label="Close notification"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 3 }}
                        onAnimationComplete={onClose}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Notification
