import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Table,
  Td,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { IMAGE_B_URL } from "../constants/imageUrl";
import { InfoType } from "../constants/InfoType";

export default function OutputBoxB() {
  const { typeBCol } = useSelector((state) => state.signatureImg);
  const { isLoading } = useSelector((state) => state.createSignature);

  const contentRef = useRef(null);

  const handleCopy = () => {
    const signatureTable = contentRef.current;
    let range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(signatureTable);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(signatureTable);
        sel.addRange(range);
      }
      document.execCommand("copy");
    }
    sel.removeAllRanges();
  };

  const getLinkValue = (type, value) => {
    if (type === InfoType.PHONE) {
      return `tel:${value}`;
    } else if (type === InfoType.EMAIL) {
      return `mailto:${value}`;
    } else {
      return value;
    }
  };

  const typeBOutput = () => {
    return (
      <Td style={{ border: "none" }}>
        <Table
          cellPadding="0"
          style={{ borderCollapse: "collapse", border: 0 }}
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <td
                style={{
                  margin: "0.1px",
                  padding: "0px 10px 0px 0px",
                  border: "none",
                  verticalAlign: "top",
                  display: "block",
                  width: "90",
                  height: "90",
                  borderCollapse: "collapse",
                }}
              >
                <Link href="https://www.infolink-group.com/" border="none">
                  <Image htmlWidth="90" src={IMAGE_B_URL} display="block" />
                </Link>
              </td>
              <td
                style={{
                  padding: 0,
                  border: "none",
                  borderLeft: "1px solid #ccc",
                }}
              >
                <Table
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ borderCollapse: "collapse", border: "none" }}
                >
                  <tbody>
                    {typeBCol.map(
                      (info, index) =>
                        info.img &&
                        (info.type === InfoType.NORMAL ? (
                          <tr key={index}>
                            <td
                              style={{
                                margin: "0.1px",
                                padding: "0px 0px 0px 5px",
                                border: "none",
                                borderCollapse: "collapse",
                                height: 28,
                              }}
                            >
                              <Image
                                htmlWidth="300"
                                src={info.img}
                                key={index}
                              />
                            </td>
                          </tr>
                        ) : (
                          <tr key={index}>
                            <td
                              style={{
                                margin: "0.1px",
                                padding: "0px 0px 0px 3px",
                                border: "none",
                                borderCollapse: "collapse",
                                height: 28,
                              }}
                            >
                              <Link
                                href={getLinkValue(info.type, info.value)}
                                key={index}
                                border="none"
                                display="block"
                              >
                                <Image htmlWidth="300" src={info.img} />
                              </Link>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </Table>
              </td>
            </tr>
          </tbody>
        </Table>
      </Td>
    );
  };

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" h="30%">
          <BeatLoader color="#1B4079" />
        </Flex>
      ) : (
        <>
          <Box ref={contentRef}>
            <Table
              cellPadding="0"
              ref={contentRef}
              style={{
                borderCollapse: "collapse",
                border: 0,
                minHeight: "200px",
              }}
              cellSpacing="0"
            >
              <tbody>
                <tr>{typeBOutput()}</tr>
              </tbody>
            </Table>
          </Box>
          <Box textAlign="right" mr="20px">
            <IconButton
              colorScheme="facebook"
              variant="outline"
              borderRadius="50"
              icon={<CopyIcon />}
              onClick={handleCopy}
            />
          </Box>
        </>
      )}
    </>
  );
}
