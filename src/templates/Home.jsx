import React from "react";
import { useSelector } from "react-redux";
import { getUserId, getUsername } from "../reducks/users/selectors";

const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  return (
    <div>
      <h2>Homeページ</h2>
      <p>uid:{uid}</p>
      <p>username:{username}</p>
    </div>
  );
};

export default Home;

// useSelectorというHOOKsでRedux全体のStateを受け取る
// ->そのStore全体のStateをselectorという定数に格納
// ->getUserIdの引数にselectorを渡すことで、userというStateのuidを取得できる
