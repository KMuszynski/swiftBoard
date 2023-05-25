import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const fetchTasks = async (setTasks, company) => {
  try {
    const {data, error} = await supabase.from('tasks').select().eq('company', company)
    if (error) throw error

    if (data) setTasks(data)
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
