import React, { useEffect, useState } from "react";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Navbar } from "../components/navbar";

const totalNFTs = 5700; // Numero totale di NFT nella collezione
const additionalStakedNFTs = 247; // Numero aggiuntivo di NFT staked

const Profile = () => {
  const { contract } = useContract("0x413ee93A4636AB0279F083571ab0d93b1b246978");
  const { data: stakedEvents } = useContractEvents(contract, "TokensStaked");
  const [totalStakedNFTs, setTotalStakedNFTs] = useState(0);
  const { data: rewardsClaimedEvents } = useContractEvents(contract, "RewardsClaimed");
  const [totalRewardsClaimed, setTotalRewardsClaimed] = useState(0);

  useEffect(() => {
    if (stakedEvents) {
      setTotalStakedNFTs(stakedEvents.length + additionalStakedNFTs); // Aggiungiamo 140 NFT staked in più
    }
  }, [stakedEvents]);

  const percentageStaked = (totalStakedNFTs / totalNFTs) * 100;
  const formattedPercentage = `${percentageStaked.toFixed(2)}%`;

  useEffect(() => {
    if (rewardsClaimedEvents) {
      setTotalRewardsClaimed(rewardsClaimedEvents.length);
    }
  }, [rewardsClaimedEvents]);

  return (
    <div className={styles["profile-overlay"]}>
      <div className={styles["profile-container"]}>
        <h2>Total Staked NFTs</h2>
        <div>{totalStakedNFTs.toLocaleString()}/{totalNFTs.toLocaleString()}</div>
        <div className={styles["progress-bar-container"]}>
          <div className={styles["progress-bar"]} style={{ width: `${formattedPercentage}` }} />
        </div>
        <div>{formattedPercentage}</div>
      </div>

      <div className={styles["profile-overlay2"]}></div>
      <div className={styles["profile-container2"]}>
        <h2>Estimated Rewards</h2>
        <p>
          <strong>POLYWATCH BASE</strong>
        </p>
        <p>0.1 $TIME/H</p>
        <div></div>
        <hr />
        <p>
          <strong>POLYWATCH LUXURY/COLLAB</strong>
        </p>
        <p>0.4 $TIME/H</p>
        <div></div>
        <hr />
        <p>
          <strong>POLYWATCH GOLD</strong>
        </p>
        <p>3 $TIME/H</p>
      </div>

      <Navbar />

      <div>
        {/* Your existing profile content */}
        <Overlay />
      </div>
    </div>
  );
};

export default Profile;
