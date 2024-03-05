import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL} from "../constants/apiConstants"

type QuoteItem = {
    quote: string;
}


export default function HomePage () {
    const [quotes, setQuotes] = useState<QuoteItem[]>([]);

    const getRandomQuote = async () => {
        const url = API_BASE_URL + "/quotes/random";
        const {data} = await axios.get(url)

        console.log(JSON.stringify(data));
        const quoteArr = [];
        quoteArr.push(data);
        return quoteArr;
    };
    
    useEffect(() => {
        getRandomQuote().then(quoteArr => setQuotes(quoteArr));
    }, [])
    
    return (
      <main>
        <div className="quote-container">
          <h1>Quote Page</h1>
          {quotes.map((item: QuoteItem) => {
            return (
              <ul key={item.quote}>
                <div className="quote">{item.quote}</div>
              </ul>
            );
          })}
        </div>
      </main>
    );
}