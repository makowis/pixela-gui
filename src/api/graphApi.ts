import axios from "axios";
import { User } from "@/types/user"

const getGraphDefinitions = (user: User, successCb: (response: any) => void, errorCh: (error: any) => void) => {

  axios
  .get(`https://pixe.la/v1/users/${user.username}/graphs`, {
    headers: {
      "X-USER-TOKEN": user.token
    }
  })
  .then(successCb)
  .catch(errorCh);
}

export { getGraphDefinitions }