import {useToast} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'
import {toast} from '@/theme'

const fetchTasks = async (setTasks, company) => {
  try {
    const {data, error} = await supabase
      .from('tasks')
      .select()
      .eq('company', company)
      .order('created_at', {ascending: false})
    if (error) throw error

    setTasks(data || [])
  } catch (error) {
    console.log(error)
    toast({
      title: 'Błąd.',
      description: 'Nie można pobrać zadań.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    setTasks(null)
  }
}

export default fetchTasks
