import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameLoad, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const CreateBattle = () => {
  const { contract, gameData, setShowAlert, battleName, setBattleName, setErrorMessage, waitBattle, setWaitBattle } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.playerActiveBattle) navigate(`/battle/${gameData.playerActiveBattle.name}`);
  }, [gameData]);

  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;

    try {
      await contract.createBattle(battleName);
      setShowAlert({ status: true, type: 'success', msg: 'You have successfully created a battle' });

      setWaitBattle(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Battle</label>
          <input
            type="text"
            placeholder="Enter battle name"
            disabled={waitBattle}
            value={battleName}
            onChange={(e) => setBattleName(e.target.value)}
            className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet disabled:text-gray-500 p-4 rounded-md sm:max-w-[50%] max-w-full"
          />
        </div>
        <button
          type="button"
          className="mt-6 px-4 py-2 rounded-lg bg-siteViolet disabled:bg-gray-500 w-fit text-white font-rajdhani font-bold"
          disabled={waitBattle}
          onClick={handleClick}
        >
          Create Battle
        </button>
      </div>

      {waitBattle ? (
        <div className="mt-5">
          <p className="font-rajdhani font-medium text-lg text-siteViolet">Waiting for other player to join...</p>
        </div>
      ) : (
        <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5"
          onClick={() => navigate('/join-battle')}
        >
          Or join already existing battles
        </p>
      )}
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>Create <br /> a new Battle</>,
  <>Create your own battle and wait for other players to join you</>,
);
