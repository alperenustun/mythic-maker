import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <p className={styles.logo}>MythicMaker</p>
    </nav>
  )
}

export default Navbar