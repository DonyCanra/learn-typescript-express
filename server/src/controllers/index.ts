import { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

class Controller {
  public static async fetchDatabase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, page = 1 } = req.query;

      let options: AxiosRequestConfig = {};

      if (name) {
        options.params = { name };
      } else if (page) {
        options.params = {
          num: 1,
          offset: 1 * Number(page),
        };
      }

      const { data } = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php", options);      

      res.status(200).json(
        {
            "status": true,
            "error": null,
            "data": [data.data[0]],
            "meta": data.meta,
            "info": null
        }
      );
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;
