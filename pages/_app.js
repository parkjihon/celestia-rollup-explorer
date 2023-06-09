import { useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import Web3 from "web3";
import { useStore } from "../utils/store";
import Caver from "caver-js";
import "../styles/global.css";

export default function App(props) {
  const { Component, pageProps } = props;
  const setWeb3 = useStore((state) => state.setWeb3);
  const setCaver = useStore((state) => state.setCaver);
  const [setAccount, setUser, setNetworkId] = useStore((state) => [
    state.setAccount,
    state.setUser,
    state.setNetworkId,
  ]);
  const wallet = useStore((state) => state.wallet);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && wallet === "metamask") {
      // window.ethereum이 있다면
      try {
        const chainId = parseInt(window.ethereum.chainId, 16);
        if (chainId === 1001 || chainId === 8217) {
          const caver = new Caver(window.ethereum);
          setCaver(caver);
        } else {
          const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
          setWeb3(web);
        }

        window.ethereum.on("accountsChanged", () => {
          connectWallet({ setAccount, setUser, setNetworkId });
        });
        // return window.ethereum.removeListener("accountsChanged", () => {});
      } catch (err) {
        console.log(err);
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (typeof window.klaytn !== "undefined" && wallet === "kaikas") {
      // window.klaytn이 있다면
      try {
        // const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        // setWeb3(web);
        const caver = new Caver(window.klaytn);
        setCaver(caver);

        window.klaytn.on("accountsChanged", () => {
          console.log("accountsChanged");
          connectKaikas({ setAccount, setUser, setNetworkId });
        });
        // return window.klaytn.removeListener("accountsChanged", () => {});
      } catch (err) {
        console.log(err);
      }
    }
  }, [wallet]);

  return (
    <>
      <Head>
        <title>Celestia Rollup Explorer</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" /> */}
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
