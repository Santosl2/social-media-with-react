import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { api } from "../../services/api";

export function ModalPublish() {
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>();
  const toast = useToast();

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    const { value } = textareaRef.current;
    setIsLoading(true);

    if (value) {
      try {
        await api.post("/posts", { message: value });

        toast({
          title: "Post created successfully",
          description:
            "Now you can see this post on dashboard list posts page.",
          variant: "left-accent",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (e) {
        toast({
          title: e,
          description: e.message,
          variant: "left-accent",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
        textareaRef.current.value = "";
      }
    }
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>New publication</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isRequired>
              <Textarea
                ref={textareaRef}
                placeholder="Say something..."
                onChange={(e) => {
                  textareaRef.current.value = e.target.value;
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
              loadingText="Submitting"
              type="submit"
            >
              Publish
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
}
