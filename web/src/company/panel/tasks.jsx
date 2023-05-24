import {EditIcon, ViewIcon} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

const Tasks = () => {
  const items = [
    {
      name: 'Wprowadzenie do firmy',
      points: 20,
      description:
        'Szkolenie wprowadzające nowych pracowników do firmy. Podczas tego szkolenia uczestnicy poznają historię i wartości naszej firmy, strukturę organizacyjną, oraz główne cele i strategię działania. Omawiane są również kluczowe procesy biznesowe i praktyki pracy, aby nowi pracownicy mogli lepiej zrozumieć, jak współpracować i przyczynić się do sukcesu firmy.',
    },
    {
      name: 'Zapoznanie z narzędziami pracy',
      points: 15,
      description:
        'Szkolenie dotyczące używania narzędzi i technologii używanych w firmie. W ramach tego szkolenia pracownicy otrzymują wgląd w różne narzędzia, oprogramowanie i systemy, które są wykorzystywane w codziennej pracy. Uczestnicy dowiadują się, jak efektywnie korzystać z tych narzędzi, jakie są ich główne funkcje i możliwości, oraz jak mogą je wykorzystać w celu zwiększenia produktywności i efektywności w wykonywaniu swoich zadań.',
    },
    {
      name: 'Szkolenie z zasad bezpieczeństwa',
      points: 10,
      description:
        'Szkolenie dotyczące procedur i zasad bezpieczeństwa w miejscu pracy. Podczas tego szkolenia omawiane są najważniejsze kwestie dotyczące bezpieczeństwa, takie jak praktyki BHP, przepisy i regulacje obowiązujące w branży, procedury awaryjne oraz zasady postępowania w sytuacjach niebezpiecznych. Uczestnicy szkolenia dowiadują się, jak identyfikować i minimalizować ryzyko wystąpienia wypadków oraz jak działać odpowiedzialnie i bezpiecznie w miejscu pracy, dbając zarówno o swoje bezpieczeństwo, jak i innych pracowników.',
    },
    {
      name: 'Szkolenie z efektywnej komunikacji',
      points: 12,
      description:
        'Szkolenie skupione na rozwijaniu umiejętności efektywnej komunikacji w miejscu pracy. Uczestnicy zdobywają wiedzę na temat różnych technik komunikacyjnych, zarówno werbalnych, jak i niewerbalnych. Omawiane są strategie budowania pozytywnych relacji zespołowych, rozwiązywania konfliktów, a także umiejętności słuchania i wyrażania swoich pomysłów i opinii w sposób klarowny i zrozumiały dla innych.',
    },
    {
      name: 'Szkolenie z zarządzania projektem',
      points: 18,
      description:
        'Szkolenie skierowane do pracowników odpowiedzialnych za zarządzanie projektami. Uczestnicy dowiadują się o podstawowych zasadach zarządzania projektami, takich jak definiowanie celów i zakresu projektu, planowanie, alokowanie zasobów, monitorowanie postępów i kontrola jakości. Omawiane są również metodyki zarządzania projektami, takie jak Scrum czy Kanban, oraz narzędzia i techniki, które mogą być stosowane w procesie zarządzania projektem.',
    },
    {
      name: 'Szkolenie z umiejętności przywódczych',
      points: 15,
      description:
        'Szkolenie skupione na rozwijaniu umiejętności przywódczych u pracowników na różnych poziomach hierarchii. Uczestnicy zdobywają wiedzę i umiejętności związane z efektywnym przywództwem, takie jak delegowanie zadań, motywowanie zespołu, rozwiązywanie problemów, podejmowanie decyzji i budowanie zaangażowania. Omawiane są różne style przywództwa i techniki zarządzania ludźmi, które mogą być stosowane w celu osiągnięcia sukcesu zarówno indywidualnego, jak i zespołowego.',
    },
    {
      name: 'Szkolenie z innowacyjności i kreatywności',
      points: 14,
      description:
        'Szkolenie skierowane do pracowników, którzy chcą rozwijać swoje umiejętności innowacyjne i kreatywne myślenie. Uczestnicy dowiadują się o procesie twórczym, technikach generowania pomysłów, sposobach rozwiązywania problemów i podejściach do innowacji w organizacji. Omawiane są również strategie zachęcające do współpracy i otwartości na nowe pomysły, oraz metody wdrażania innowacji w praktyce.',
    },
  ]

  return (
    <Center>
      <Stack spacing={5} w="3xl" pt="12">
        {items &&
          items.map((item, id) => (
            <Box key={id} bg="gray.700" rounded="3xl" boxShadow="2xl">
              <Accordion allowToggle m={1}>
                <AccordionItem border="none">
                  <Flex align="center">
                    <AccordionButton mr="3">
                      <Box as="span" flex="1" textAlign="left">
                        <Heading as="h3" size="md">
                          {item.name}
                        </Heading>
                        <Divider mb={2} mt={4} />
                        <Text>{item.points} punktów</Text>
                      </Box>
                      <AccordionIcon ml="5" />
                    </AccordionButton>
                    <Button variant="ghost" leftIcon={<EditIcon />} size="lg">
                      Edytuj
                    </Button>
                  </Flex>
                  <AccordionPanel pb={1}>{item.description}</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          ))}
      </Stack>
    </Center>
  )
}

export default Tasks
