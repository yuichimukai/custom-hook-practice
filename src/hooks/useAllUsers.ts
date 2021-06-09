import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/user";

// 全ユーザー一覧を取得するカスタムフック
// カスタムフックを作る際はuseから始めるファイル、関数コンポーネントとして利用
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);
    //コンポーネントにロジックを全部書いてしまうとコンポーネントが肥大化して見ずらいかつ違う画面でデータをもう一度取得する際はまた面倒になるカスタムフックを使うことでロジックを分割して行うことが良い。

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};
