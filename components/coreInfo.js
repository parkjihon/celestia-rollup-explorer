import Image from "next/image";
import styled from "styled-components";
import { Table } from "@mantine/core";
import { SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CoreInfo = ({ data }) => {
  return (
    <>
      <div style={{ margin: "0px 0px 20px 0px"}}>
        <Text style={{ color: "#444", fontSize: "24px", margin: "0px 0 20px 0px", fontWeight: "bold" }} align="left">
          Summary
        </Text>
        <SimpleGrid
          style={{ padding: "0 0px", margin:"0px 0px 0px 0px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
        <Table withBorder>
          <tbody>
            <tr><td width="20%">Total Chains #</td><td><b>{data?.cntNIDs}</b></td></tr>  
            <tr><td width="20%">Total Blobs #</td><td><b>{data?.cntBlobs}</b></td></tr>  
            <tr><td width="20%">Total TXs #</td><td><b>{data?.cntTXs}</b></td></tr>  

          </tbody>
        </Table>
        </SimpleGrid>
      </div>
    </>
  );
};

export default CoreInfo;
