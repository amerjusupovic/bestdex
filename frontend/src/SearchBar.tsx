import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input } from 'antd';

function SearchBar(props: any) {
    const navigate = useNavigate();
    const [params, setParams] = useState({ q: "" })
    const [searchQuery, setSearchQuery] = useState("");
    const propsSetParams = props.setParams;

    useEffect(() => {
        const navigateSearch = async () => {
          try {
            if (params.q) {
              navigate("/search?q=" + params.q)
            }
          } catch (err) {
            console.error(err);
          }
        }
        navigateSearch();
      }, [params, navigate]);
  
    function handleSearch(e: any) {
        if (!e.key || e.key === "Enter") {
          setParams({...params, q: searchQuery});
          if (propsSetParams) {
            propsSetParams({...params, q: searchQuery});
        }
        }
      }
    
    function handleSearchInput(e: any) {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="search-bar-header-input">
            <Input.Search className="search-input search-bar-header-scale" placeholder="SEARCH FOR A CARD" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/>
        </div>
    );
}

export default SearchBar;