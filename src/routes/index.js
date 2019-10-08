import { UserController } from '../controllers';
import { validateUserData, auth } from '../middlwares';

// const router = Router();

const router = (app) => {
  /* GET index page. */
  app.get('/', (req, res) => {
    res.json({
      title: 'Express',
    });
  });

  app.post('/signup', validateUserData, UserController.signup);
  app.get('/verification/:userEmail', auth, UserController.verifyUserSignup);
};

export default router;
