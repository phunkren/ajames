import { GetStaticProps } from "next";
import { memo, ReactElement, useMemo } from "react";
import { Box } from "../components/Box";
import { ShareButton } from "../components/Button";
import { InventoryCard } from "../components/Card";
import { Divider } from "../components/Divider";
import {
  Frontmatter,
  InventoryCount,
  RetailerCount,
  TotalCategories,
} from "../components/Frontmatter";
import { ActionButtons, Layout } from "../components/Layout";
import { BlueskyShareLink, NotionViewLink } from "../components/Link";
import { TextAux, TextTitle1, TextTitle2 } from "../components/Text";
import { getInventory } from "../lib/notion";
import { styled } from "../stitches.config";
import { ONE_MINUTE_IN_SECONDS } from "../util/date";
import {
  getFormattedInventory,
  getUniqueRetailers,
  Inventory as InventoryType,
  NOTION_INVENTORY_ID,
  sortInventory,
} from "../util/notion";
import { INVENTORY_SHARE_TEXT, INVENTORY_URL } from "../util/youtube";
import { NextPageWithLayout } from "./_app";

type Props = {
  inventory: InventoryType;
};

const StyledInventoryCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(auto, 1fr))",
  gridColumnGap: "$4",
  borderRadius: "$1",
  padding: "$2",
  width: "100%",

  bp2: {
    gridTemplateColumns: "repeat(12, 1fr)",
  },
});

export const INVENTORY_ID = "inventory";

export const getStaticProps: GetStaticProps = async () => {
  const inventory = await getInventory();
  const formattedInventory = getFormattedInventory(inventory);
  const sortedInventory = sortInventory(formattedInventory);

  return {
    props: {
      inventory: sortedInventory,
    },
    revalidate: ONE_MINUTE_IN_SECONDS,
  };
};

const Inventory: NextPageWithLayout = memo(function Inventory({
  inventory,
}: Props) {
  const inventoryCategories = Object.entries(inventory);

  const inventoryCount = useMemo(
    () =>
      inventoryCategories.reduce((totalSum, entry) => {
        const [_, collection] = entry;
        return totalSum + collection.length;
      }, 0),
    [inventoryCategories]
  );

  const retailerCount = getUniqueRetailers(inventory);

  return (
    <Box as="section" direction="vertical" spacingHorizontal={7}>
      <Box direction="vertical" container="l" css={{ zIndex: "$1" }}>
        <Box direction="vertical">
          <Box
            justifyContent="space-between"
            alignItems="center"
            spacingTop={12}
            spacingBottom={{ "@initial": 4, "@bp2": 10 }}
          >
            <TextTitle1 as="h1">Inventory</TextTitle1>

            <Box
              position="relative"
              css={{
                display: "none",
                "@bp2": { display: "flex", left: "-$1" },
              }}
            >
              <NotionViewLink id={NOTION_INVENTORY_ID} type="button" />
            </Box>

            <NotionViewLink
              id={NOTION_INVENTORY_ID}
              type="icon"
              css={{
                display: "flex",
                "@bp2": {
                  display: "none",
                },
              }}
            />
          </Box>

          <Box alignItems="flex-end" justifyContent="space-between">
            <Frontmatter>
              <TotalCategories total={inventoryCategories.length} icon />
              <RetailerCount total={retailerCount} icon />
              <InventoryCount total={inventoryCount} icon />
            </Frontmatter>

            <ActionButtons css={{ width: "auto" }}>
              <BlueskyShareLink
                url={INVENTORY_URL}
                text={INVENTORY_SHARE_TEXT}
                variant="icon"
              />

              <ShareButton
                url={INVENTORY_URL}
                text={INVENTORY_SHARE_TEXT}
                variant="icon"
              />
            </ActionButtons>
          </Box>

          <Box spacingTop={10}>
            <Divider />
          </Box>
        </Box>

        {inventoryCategories.map(([category, categoryItems]) => {
          return (
            <Box key={category} direction="vertical">
              <Box
                spacingTop={11}
                spacingBottom={{ "@initial": 8, "@bp2": 10 }}
              >
                <TextTitle2 as="h2">{category}</TextTitle2>
              </Box>

              <StyledInventoryCardContainer
                css={{
                  overflowY: "hidden",
                  scrollSnapType: "x mandatory",

                  scrollPadding: "0 $1",
                  width: "100%",
                  height: "100%",

                  perspective: 100,
                  transform: "translate3d(0,0,0)",
                  ["-webkit-transform"]: "translateZ(0,0,0)",
                }}
              >
                {categoryItems.map((categoryItem) => (
                  <InventoryCard
                    key={categoryItem.id}
                    id={categoryItem.id}
                    retailer={categoryItem.retailer}
                    url={categoryItem.url}
                    image={categoryItem.image}
                    title={categoryItem.title}
                    affiliate={categoryItem.affiliate}
                    category={categoryItem.category}
                    css={{
                      scrollSnapAlign: "center",
                      "@bp2": { scrollSnapAlign: "start" },
                    }}
                  />
                ))}
              </StyledInventoryCardContainer>
            </Box>
          );
        })}
        <Box
          spacingTop={{ "@initial": 10, "@bp2": 11 }}
          justifyContent="center"
        >
          <TextAux as="p" textAlign="center" color="secondary">
            * As an Amazon Associate, I earn from qualifying purchases (marked
            Affiliate).
          </TextAux>
        </Box>
      </Box>
    </Box>
  );
});

Inventory.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Inventory;
