import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import CharacterCreation from "../components/CharacterCreation/CharacterCreation";
import { useRef } from "react";
import Footer from "../components/Footer/Footer";

export default function Home() {

  const ref = useRef(null);

  const handleScroll = () => ref.current?.scrollIntoView({behavior: "smooth"});

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Mythic maker is a rpg character generating app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <div className={styles.mainInner}>
          <h2 className={styles.mainSubtitle}>With AI</h2>
          <h1 className={styles.mainTitle}>Generate Your Character</h1>
          <p className={styles.mainDescription}>
            Introducing the Mythic Maker! With just a few taps, this app will
            generate fully-fledged, unique characters for your next role-playing
            adventure!
          </p>
          <button onClick={handleScroll} className={styles.mainButton}>Create Character</button>
        </div>
      </main>

      <div className={styles.seperator}></div>

      <section ref={ref} className={styles.creationSection}>
        <CharacterCreation />
      </section>
      <Footer />
    </>
  );
}
