import { selectProfile } from '@/auth/state'
import LoadingView from '@/common/components/loading-view'
import { useAppSelector } from '@/store'
import {Box, Center, Progress} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { AspectRatio } from '@chakra-ui/react'

const Dashboard = () => {
  const user = useAppSelector(selectProfile)
  
  return !user ? <LoadingView/> : <Box w='100%' p={4}>
    <Center w='100%' textAlign='center' fontSize='xl' fontWeight='bold'>
      Panel Główny 
     </Center>
    {/* <Center mb={5} w='100%' textAlign='center' fontSize=''>
    {user.full_name} <br/>{user.position ? (user.position) : ('No possition')}
    </Center>   */}
    <Box textAlign='center'>
    <br/>Witaj w SwiftBoard, platformie onboardingowej wykożystującej chat GPT. <br/>
      Po lewo znajdziesz swoją listę zadań do wykonania. <br/>
      Po prawo- zakładkę chatu, możesz zadawać mu pytania dotyczące danego zadania lub firmy. <br/><br/>
    </Box>
    <Box mb={3}>
      Tasks Completed: {user.points ? user.points : "77 / 100"}
    </Box>
    <Progress height={6} value={(user.points ? user.points : 77)} />
    <AspectRatio maxW='700px' ratio={945/561}>
  <Image boxSize={6} src='swiftboard-graph.png' alt='BarGraph' /> 
  </AspectRatio>
  </Box>
}

export default Dashboard
