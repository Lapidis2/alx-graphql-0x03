import { useQuery } from "@apollo/client"
import { GET_EPISODES } from "@/graphql/queries"
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"


const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page
    }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  const results = data?.episodes.results
  const info = data?.episodes.info

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}

              key={key}
            />
          ))}
        </div>

       {/* Pagination with icons */}
<div className="flex items-center justify-center gap-8 mt-6">
  {/* Previous Button */}
  <button
    onClick={() => setPage(prev => (prev > 1 ? prev - 1 : 1))}
    disabled={page === 1}
    className="p-2 bg-[#45B69C] text-white rounded-full shadow-lg hover:bg-[#3D9B80] transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <ChevronLeftIcon className="w-6 h-6" />
  </button>

  {/* Current Page Display */}


  {/* Next Button */}
  <button
    onClick={() => setPage(prev => (prev < info.pages ? prev + 1 : prev))}
    disabled={page === info.pages}
    className="p-2 bg-[#45B69C] text-white rounded-full shadow-lg hover:bg-[#3D9B80] transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <ChevronRightIcon className="w-6 h-6" />
  </button>
</div>

      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home
