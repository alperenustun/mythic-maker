import styles from "./CharacterCreation.module.css";
import Image from "next/image";
import { useState } from "react";
import CharacterCard from "./CharacterCard/CharacterCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function CharacterCreation() {
  const [nameInput, setNameInput] = useState("");
  const [result, setResult] = useState();
  const [gender, setGender] = useState("");

  const [pictureResult, setPictureResult] = useState();
  const [nameInputPicture, setNameInputPicture] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function extractStats(string) {
    const statStrings = string.split(", ");
    const stats = {};

    for (const statString of statStrings) {
      let [name, value] = statString.split(" - ");
      if (value === undefined) {
        [name, value] = statString.split(" ");
      }
      stats[name] = parseInt(value);
    }
    return stats;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setResult("");
    setPictureResult("");
    const nameResponse = await fetch("/api/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character: `${gender} ${nameInput}` }),
    });
    const nameData = await nameResponse.json();

    setResult(nameData);
    setNameInput("");

    setIsLoading(false);
  }

  async function onPictureGenerate() {
    setIsLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character: `${result.appearance} ${nameInputPicture} `,
      }),
    });
    const data = await response.json();
    setPictureResult(
      data.result.map((picture) => {
        return (
          <img
            key={picture.url}
            src={picture.url}
            alt="character picture"
            className={styles.imagesSingle}
          />
        );
      })
    );

    setIsLoading(false);
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Create Your Character</h1>
      <Image
        className={styles.iconSeperator}
        src="/icon-seperator.png"
        alt="Next.js Logo"
        width={100}
        height={40}
        priority
      />

      <form onSubmit={onSubmit}>
        <div className={styles.genderContainer}>
          <h3 className={styles.chooseGenderText}>Choose a gender</h3>
          <div className={styles.genderImagesContainer}>
            <div>
              <Image
                src="/character-male.png"
                alt="Next.js Logo"
                width={180}
                height={300}
                priority
                style={{ display: "block" }}
              />
              <input
                onChange={(e) => setGender(e.target.value)}
                id="male"
                type="radio"
                name="gender"
                value="male"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <Image
                src="/character-female.png"
                alt="Next.js Logo"
                width={220}
                height={300}
                priority
                style={{ display: "block" }}
              />
              <input
                onChange={(e) => setGender(e.target.value)}
                id="female"
                type="radio"
                name="gender"
                value="female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className={styles.nameInputContainer}>
          <h3 className={styles.chooseClassText}>Choose a class</h3>
          <input
            type="text"
            name="character"
            required
            placeholder="Enter a class e.g., wizard, ninja"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              setNameInputPicture(e.target.value);
            }}
            className={styles.nameInput}
          />
          <input
            disabled={isLoading ? true : false}
            type="submit"
            value="Generate character"
            className={styles.submitButton}
          />
        </div>
      </form>

      {result && (
        <div className={styles.characterFullContainer}>
          <h1 className={styles.characterFullTitle}>{result.name}</h1>
          <p className={styles.characterFeature}>{result.appearance}</p>
          <p className={styles.characterFeature}>{result.personality}</p>
          <p className={styles.characterFeature}>{result.story}</p>
          <p className={styles.characterFeature}>{result.stats}</p>
        </div>
      )}
      {result && (
        <div className={styles.ImagesContainer}>
          <button
            disabled={isLoading ? true : false}
            onClick={onPictureGenerate}
            className={styles.pictureGenerateButton}
          >
            Generate Images
          </button>
          {pictureResult && (
            <div className={styles.imagesMultiple}>{pictureResult}</div>
          )}
        </div>
      )}

      {isLoading && <LoadingScreen />}
    </div>
  );
}

export default CharacterCreation;

{
  /* <Image
        className={styles.logo}
        src="/character.png"
        alt="Next.js Logo"
        width={180}
        height={300}
        priority
     /> */
}
