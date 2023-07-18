import { ThirdwebNftMedia, useAddress, useContract, useContractRead, useNFT, Web3Button } from "@thirdweb-dev/react";
import { FC, useEffect, useState } from "react";
import { editionDropContractAddress, stakingContractAddress } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

type NFTCardProps = {
  tokenId: number;
  metadata?: any;
  name: string;
  className: string;
  quantity?: number;
  
};

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract, isLoading } = useContract("0x873e032F810DbA36D19B3B80bcaa346a7112C423");
  const { data: nft } = useNFT(contract, tokenId);

const [withdrawQuantity, setWithdrawQuantity] = useState<number>(1);
  



const stakingContract = useContract("0x413ee93A4636AB0279F083571ab0d93b1b246978") 

const staker = useAddress();
const [stakedTokenQuantity, setStakedTokenQuantity] = useState<number>(0);

useEffect(() => {
  if (!stakingContract?.contract || !staker || tokenId === undefined) return;

  async function fetchStakedQuantity() {
    const stakeInfo = await stakingContract.contract?.call("getStakeInfoForToken", [
      tokenId,
      staker,
    ]);

    const stakedQuantity = stakeInfo?.[0] || 0;
    setStakedTokenQuantity(stakedQuantity);
  }

  fetchStakedQuantity();
}, [stakingContract, staker, tokenId]);



return (
  <>
  {nft && (
   <div className={styles.nftBox}>
   {nft.metadata && (
     <ThirdwebNftMedia
       metadata={nft.metadata}
       className={`${styles.nftMedia} ${styles.quantityMedia}`}
     />
  
     )}
  
        <div className={styles.nftInfo}>
          <h3>{nft.metadata?.name}</h3>
          <div className={styles.stakedInfo}>
            
          <p className={styles.stakedQuantity}>
              STAKED QUANTITY: {stakedTokenQuantity.toString()}
            </p>
   
  
         
          </div>
        </div>
  
        
      </div>
    )}
    
    <label htmlFor="stakeInput" className={styles.selectLabel}>
              SELECT QUANTITY TO UNSTAKE
            </label>
            
            
            <input
  type="number"
  placeholder="Withdraw quantity"
  value={withdrawQuantity}
  onChange={(e) => setWithdrawQuantity(parseInt(e.target.value))}
  className={`${styles.withdrawInput} withdrawInput`}
  inputMode="numeric"
/>

    
<Web3Button
  action={(contract) =>
    contract?.call("withdraw", [tokenId, withdrawQuantity])
  }
  contractAddress={stakingContractAddress}
  style={{
    backgroundColor: "#FF6600",
    border: "none",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "4px 8px", // Riduci il padding per rendere il pulsante più piccolo
    borderRadius: "4px",
    marginTop: "5px",
    width: "80px", // Riduci la larghezza del pulsante
    height: "24px", // Riduci l'altezza del pulsante
  }}
>
  Unstake
</Web3Button>


  </>
);
};


export default NFTCard;  