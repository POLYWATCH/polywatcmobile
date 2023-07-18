import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { isAddress } from "ethers/lib/utils";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo4.png"
              width={166}
              height={100}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile`}>
                    <Image
  className={styles.profileImage}
  src="/icon.svg"
  width={42}
  height={42}
  alt="Profile"
  style={{ marginTop: '5px' }} // Modifica questo valore per spostare l'immagine verso il basso
/>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}