import Image from "next/image";
import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
        <Image src="/loading.gif" alt="loading-gif" width={400} height={300} />
        <h2 className={styles.loadingText}>Loading...</h2>
    </div>
  )
}

export default LoadingScreen