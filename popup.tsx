import { useState } from "react"
import { getClosestColor } from "./utils/colors"
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Input,
  Text,
  SimpleGrid,
  Flex,
  IconButton,
  Link,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react"
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons"

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({
    name: "",
    rgb: { r: 0, g: 0, b: 0 },
    hex: "#000000"
  })

  const { onCopy: copyHex } = useClipboard(selectedColor.hex)
  const { onCopy: copyName } = useClipboard(selectedColor.name)

  const pickColor = async () => {
    if (!window.EyeDropper) {
      console.log("EyeDropper is not supported!")
      return
    }

    const eyeDropper = new window.EyeDropper()
    try {
      const result = await eyeDropper.open()
      if (result) {
        const hex = result.sRGBHex
        const rgb = hexToRgb(hex)
        if (rgb) {
          const name = getClosestColor(rgb)
          setSelectedColor({ name, rgb, hex })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  return (
    <Box w="360px" p={6} bg="white" borderRadius="xl" boxShadow="lg">
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading
            size="lg"
            bgGradient="linear(to-r, blue.500, purple.500)"
            bgClip="text"
          >
            Color Picker
          </Heading>
          <Button
            colorScheme="blue"
            onClick={pickColor}
            size="md"
            shadow="sm"
          >
            Pick Color
          </Button>
        </Flex>

        <Flex gap={4}>
          <Box
            w="80px"
            h="80px"
            borderRadius="xl"
            shadow="lg"
            bg={selectedColor.hex}
            transition="box-shadow 0.2s"
            _hover={{ shadow: "xl" }}
          />
          
          <VStack flex={1} spacing={4} align="stretch">
            <Box>
              <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">
                Hex
              </Text>
              <Flex>
                <Input
                  value={selectedColor.hex}
                  isReadOnly
                  fontFamily="mono"
                  borderRightRadius={0}
                />
                <Tooltip label="Copy hex value">
                  <IconButton
                    aria-label="Copy hex"
                    icon={<CopyIcon />}
                    onClick={copyHex}
                    borderLeftRadius={0}
                    colorScheme="gray"
                    variant="outline"
                  />
                </Tooltip>
              </Flex>
            </Box>

            <Box>
              <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">
                RGB
              </Text>
              <SimpleGrid columns={3} spacing={3}>
                {['R', 'G', 'B'].map((channel, i) => (
                  <Box key={channel}>
                    <Text fontSize="xs" color="gray.500" mb={1}>
                      {channel}
                    </Text>
                    <Input
                      value={Object.values(selectedColor.rgb)[i]}
                      isReadOnly
                      size="sm"
                      fontFamily="mono"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Flex>

        <Box>
          <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">
            Tailwind CSS Color
          </Text>
          <Flex>
            <Input
              value={selectedColor.name}
              isReadOnly
              borderRightRadius={0}
            />
            <Tooltip label="Copy Tailwind class">
              <IconButton
                aria-label="Copy class"
                icon={<CopyIcon />}
                onClick={copyName}
                borderLeftRadius={0}
                colorScheme="gray"
                variant="outline"
              />
            </Tooltip>
          </Flex>
          <Link
            href="https://tailwindcss.com/docs/customizing-colors"
            isExternal
            fontSize="xs"
            color="blue.500"
            mt={2}
            display="inline-flex"
            alignItems="center"
            _hover={{ textDecoration: "underline", color: "blue.600" }}
          >
            View Tailwind Colors
            <ExternalLinkIcon mx={1} boxSize={3} />
          </Link>
        </Box>
      </VStack>
    </Box>
  )
}

function IndexPopup() {
  return (
    <ChakraProvider>
      <ColorPicker />
    </ChakraProvider>
  )
}

export default IndexPopup
