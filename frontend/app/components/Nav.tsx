"use client"
import { motion } from "framer-motion";

export default function Navbar() {
    //const socket = new WebSocket()
    return (
        <div className="flex items-center justify-between max-w-[1200px] m-auto text-slate-200 font-sans">
            <motion.div
                className="md:text-[32px] text-[24px] font-bold -tracking-wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                Panchayat
            </motion.div>
            {/* <div className="flex gap-4 text-[18px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    About
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    Blog
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    Services
                </motion.div>
            </div> */}
        </div>
    );
}
