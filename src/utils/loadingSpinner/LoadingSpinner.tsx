import { motion } from "framer-motion";
import styles from '@/utils/loadingSpinner/LoadingSpinner.module.css'

const BtnLoader1 = () => {

  return (
      <div className={styles.SpinnerBox}>
        <motion.div className={styles.spinner} 
        initial={{ opacity: 1 }} 
        animate={{ opacity: 1, rotate: [0,90,180,360]}} 
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
        exit="initial"
        >

        </motion.div>
      </div>
  );
};

export default BtnLoader1;



