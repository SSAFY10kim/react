import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Detail() {
  const {id} = useParams()

  const [info, setInfo] = useState([])

  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json()
      setInfo(json.data.movie)
      console.log(json.data.movie)
  }
  useEffect(() => {
    getMovies()
  }, [])

  return (
  <div>
    <img src={`${info.medium_cover_image}`} alt="" />
    {info.title}
    <ul>
      {info.genres && info.genres.map((g) => (
        <li key={g}>{g}</li>
      ))}
    </ul>
  </div>)
}

export default Detail 
