import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import { keyframes, styled } from "../stitches.config";
import { Box } from "./Box";
import { Button } from "./Button";
import { TextBody, TextHeadline, TextTitle1 } from "./Text";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: "black",
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} $transitions$durationDefault $transitions$functionDefault`,
  zIndex: "$4",
});

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: "white",
  color: "black",
  borderRadius: "$2",
  boxShadow: "$5",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "$6",
  animation: `${contentShow} $transitions$durationDefault $transitions$functionDefault`,
  zIndex: "$5",

  "&:focus": { outline: "none" },
});

const AlertDialogTitle = styled(AlertDialog.Title, {});

const AlertDialogDescription = styled(AlertDialog.Description, {});

export const NewWebsiteAlert = memo(function NewWebsiteAlert() {
  const { reload } = useRouter();

  const handleClick = useCallback(() => {
    reload();
  }, [reload]);

  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle asChild>
            <TextTitle1>👋</TextTitle1>
          </AlertDialogTitle>

          <AlertDialogDescription asChild>
            <TextBody>
              I've updated my website. Click the button below to see it!
            </TextBody>
          </AlertDialogDescription>

          <Box spacingTop={7}>
            <AlertDialog.Action asChild>
              <Button
                css={{ border: "1px solid black !important" }}
                onClick={handleClick}
              >
                <TextHeadline>Reload</TextHeadline>
              </Button>
            </AlertDialog.Action>
          </Box>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
});
