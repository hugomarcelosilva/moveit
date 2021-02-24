import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/hugo-marcelo.png"
        alt="Foto de perfil do Hugo Marcelo"
      />
      <div>
        <strong>Hugo Marcelo</strong>
        <p>
          <img src="icons/level.svg" alt="ícone de level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
