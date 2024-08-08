import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults/SearchResults";
export const BASE_URL = "https://foodie-upex.onrender.com";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoadilng] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData,setFilteredData]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoadilng(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoadilng(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  // console.log(data);

const searchFood= (e) => {
  const searchValue=e.target.value;
  console.log(searchValue);

  if(searchValue===""){
    setFilteredData(null);
  }
  const filter=data?.filter((food)=>
    food.name.toLowerCase().includes(searchValue.toLowerCase())

  );
  setFilteredData(filter);

  };


const filterFood=(type)=>{
  if (type==='all'){
    setFilteredData(data);
    setSelectedBtn('all');
    return ;
  }

  const filter=data?.filter((food)=>
    food.type.toLowerCase().includes(type.toLowerCase())
);
    setFilteredData(filter);
    setSelectedBtn(type);

};

const filterBtns=[
  {name:'All',
    type:'all',
  }, 
  {name:'Breakfast',
    type:'breakfast',
  } ,
  {name:'Lunch',
    type:'lunch',
  },
   {name:'Dinner',
    type:'dinner',
  },
   
]




  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="search">
            <input placeholder="Search Food" onChange={searchFood} />
          </div>
        </TopContainer>
        <FilterContainer>
          {
            filterBtns.map((value)=>(
              <Button 
              isSelected={selectedBtn===value.type}
              key={value.name} onClick={()=>filterFood(value.type)} > {value.name}</Button>

            ))
          }

{/* use of mapping to reduce unwanted  repetition  */}
          {/* <Button onClick={()=>filterFood('all')} >All</Button>
          <Button onClick={()=>filterFood('breakfast')} >BreakFast</Button>
          <Button onClick={()=>filterFood('lunch')} >Lunch</Button>
          <Button onClick={()=>filterFood('dinner')} >Dinner</Button> */}
        </FilterContainer>
      </Container>
      <SearchResults data={filteredData} />
    </>
  )
};

export default App;

export const Container = styled.div`
  /* background-color: #323334; */
  max-width: 100%;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }
  
  @media (0< width < 680px ){
    flex-direction:column;
    height:120px;

  }
  
  
  

`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  padding-bottom: 25px;
`;

export const Button = styled.button`
  /* width: fit-content; */
  background-color: ${({isSelected})=> (isSelected ? '#cd1616' : '#ff4343')} ;
outline: 1px solid ${({isSelected})=> (isSelected ? '#ffffff' : '#ff4343')} ;
  color: white;
  border: none;
  border-radius: 5px;
  padding:6px 12px;
  cursor: pointer;
  & :hover{
    background-color: #670606;
  }
`;
