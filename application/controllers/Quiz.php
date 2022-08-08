<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class : Quiz (QuizController)
 * Quiz class to control to authenticate user credentials and starts user's session.
 * @author : Kishor Mali
 * @version : 1.1
 * @since : 15 November 2016
 */
class Quiz extends CI_Controller
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set('US/Eastern');
    }

    /**
     * Index Page for this controller.
     */
    public function index()
    {
        $this->load->view("samplequiz/index.php");
    }
    
}

?>