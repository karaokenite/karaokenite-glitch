import { Box, FlexBox, Text } from "@animus-ui/components";
import { Button } from "../../../components/Button";
import { Portal } from "../../../components/Portal";

export const GiveFeedback = ({ onClose, isOpen }) => {
  return (
    <Portal mode="light" onClose={onClose} isOpen={isOpen}>
      <Box
        bg="background-current"
        p={24}
        py={36}
        borderRadius="2rem"
        width={500}
        textAlign="center"
      >
        <Text as="h3" mb={16}>
          What do you think?
        </Text>
        <Text>
          Karaoke Nite is an ongoing project. We're looking to hear your
          thoughts on how to make it even better!
        </Text>
        <FlexBox center gap="1rem" mt="1rem">
          <Button
            variant="cta"
            onClick={() =>
              window.open("https://karaokenite.typeform.com/to/SaHxnvyT")
            }
            title="Give Feedback"
          >
            Give Feedback
          </Button>
          <Button
            onClick={() =>
              window.open("https://karaokenite.typeform.com/to/qqQslFgC")
            }
          >
            Report a Bug
          </Button>
        </FlexBox>
      </Box>
    </Portal>
  );
};
