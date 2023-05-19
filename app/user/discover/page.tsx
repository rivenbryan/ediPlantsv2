'use client';

interface Props {}
import React, { useState, useEffect } from 'react'
import BackButton from '@/components/BackButton';
import Image from 'next/image';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

const Discover = (props: Props) => {
    const {} = props;
    console.log("props below")
    console.log(props)

    const examplePlantId = [791, 5022, 2251, 1595]

    const [img, setImg] = useState<string[]>([]);
    const [commonName, setCommonName] = useState<string[]>([]);
    const [fruit, setFruit] = useState<boolean[]>([]);
    const [edibleLeaf, setEdibleLeaf] = useState<boolean[]>([]);
    const [allObj, setAllObj] = useState<any>([])



    useEffect(() => {
        const fetchPlantDetails = async (plantId: number) => {
          try {
            const response = await axios.post('/api/plant/details', {
              idOfPlant: plantId
            });
            const plantDetails = response.data;
            const requiredData = {
                id: plantDetails.id,
                regular_url: plantDetails.default_image.regular_url,
                common_name: plantDetails.common_name,
                fruits: plantDetails.fruits,
                edibleLeaf : plantDetails.edible_leaf
            }
            setAllObj((prevAllObj:any) => [...prevAllObj, requiredData])

            setImg((prevImages) => [...prevImages, plantDetails.default_image.regular_url]);
            setCommonName((prevcommonName) => [...prevcommonName, plantDetails.common_name]);
            setFruit((prevFruit) => [...prevFruit, plantDetails.fruits]);
            setEdibleLeaf((prevEdibleLeaf) => [...prevEdibleLeaf, plantDetails.edible_leaf]);
          } catch (error) {
            console.error('Error fetching plant details:', error);
          }
        };
      
        const fetchAllPlantDetails = async () => {
          for (const plantId of examplePlantId) {
            await fetchPlantDetails(plantId);
          }
        };
      
        fetchAllPlantDetails();
      }, []);

      console.log(allObj)

      const generatePlantDetail = (order:number, size = 150) => {
        return(allObj[order] && 
            <>
                <div className="text-gray-800 font-bold mx-auto flex-1 text-center ">
                    {allObj[order] ? allObj[order].common_name : "loading"}
                </div>
            <div className="w-36 h-36 squared-full flex items-center justify-center">
                <a href={`/user/discover/${examplePlantId[order]}`}>
                    <Image src={allObj[order].regular_url} width={size} height={size} alt={`Image ${order}`} />
                </a>
            </div>
            <div>
                fruit: {fruit[order] ? 'yes' : 'no'}
            </div>
            <div>
                edible leaf: {edibleLeaf[order] ? 'yes' : 'no'}
            </div>
            </>

        )
      }
    

    return(
    <div className="h-[1000px] bg-FFFBEF-300">

        <div className = "pt-10 flex justify-center">
            <h2>Hi Oak Soe Khant, </h2>
        </div>
        <div className = "flex justify-center">
            <h3>we recommend you those plants!</h3>
        </div>
        
        
        <div className="py-4 px-7 flex justify-between ">
            <div className="relative flex flex-col items-center">
                {generatePlantDetail(0)}
            </div>

            <div className="relative flex flex-col items-center">
                {generatePlantDetail(1)}
            </div>
        </div>
        <div className="py-4 px-7 flex justify-between ">
            <div className="relative flex flex-col items-center">
                {generatePlantDetail(2)}
            </div>

            <div className="relative flex flex-col items-center">
                {generatePlantDetail(3)}
            </div>
        </div>
        


    
    </div>
    )
}

export default Discover;
