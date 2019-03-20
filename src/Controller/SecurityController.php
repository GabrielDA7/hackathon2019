<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\LoginType;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\LoginAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Class SecurityController
 * @package App\Controller
 * @Route(name="app_security_")
 */
class SecurityController extends AbstractController
{
    private $userRepository;
    private $authenticationUtils;

    /**
     * SecurityController constructor.
     * @param UserRepository $userRepository
     * @param AuthenticationUtils $authenticationUtils
     */
    public function __construct(
            UserRepository $userRepository,
            AuthenticationUtils $authenticationUtils
        )
    {
        $this->authenticationUtils = $authenticationUtils;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route(path="/login", name="login")
     * @param FormFactoryInterface $formFactory
     * @return Response
     */
    public function login(FormFactoryInterface $formFactory): Response
    {
        if ($this->getUser())
            return $this->redirectToRoute('app_home_index');

        $formLogin = $formFactory->createNamed('', LoginType::class, [
            '_login_username' => $this->authenticationUtils->getLastUsername(),
        ]);

        return $this->render('security/login.html.twig',[
            'error' => $this->authenticationUtils->getLastAuthenticationError(),
            'form' => $formLogin->createView()
        ]);
    }

    /**
     * @Route(name="register", path="/register")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param GuardAuthenticatorHandler $guardHandler
     * @param LoginAuthenticator $authenticator
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginAuthenticator $authenticator, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main'
            );
        }

        return $this->render('security/register.html.twig', [
                'registrationForm' => $form->createView(),
            ]);
    }

    /**
     * @Route(path="/logout", name="logout")
     */
    public function logout() {}

}
