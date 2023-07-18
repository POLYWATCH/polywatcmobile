import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.background}></div>

      <div className={styles.lightCircle}>
      <div className={styles.circleText}>
  POLYWATCH 
  <div className={styles.circleText1}>
   
  </div>

</div>
</div>


<div className={styles.buttonContainer}>
<Link href="https://polywatchmobile.netlify.app/stake">
    <div className={styles.button}>
      MOBILE
    </div>
  </Link>
  <Link href="https://polywatchstaking.netlify.app/stake">
    <div className={styles.button}>
      LAPTOP
    </div>
  </Link>
</div>
</div>
  );
};

export default Home;

