<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Sample Quiz</title>

    <!-- Core JavaScript Files -->
    <script src="<?php echo base_url(); ?>assets/libs/code.jquery.com/jquery-3.5.1.js"></script>
    <script src="<?php echo base_url(); ?>assets/libs/bootstrap-4.5.3/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/libs/typewriter.js"></script>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url(); ?>assets/libs/bootstrap-4.5.3/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <!--
    <link href="<?php echo base_url(); ?>assets/libs/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet" type="text/css">
    -->
    
    <link href="<?php echo base_url(); ?>assets/samplequiz/css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="mycontainer" align="center">
        <div class="to-start-quiz" id="div_quiz_title">
            <!--#d2691e-->
            <p style="background-color: transparent; border-radius: 20px; padding: 20px;">Audio Puzzle<br>(Please say YES or NO)</p>
        </div>
        
        <div class="to-start-quiz" id="div_enter_quiz" style="cursor: pointer;">
            Press ENTER to begin
        </div>
        <div class="quiz-done" id="div_quiz_done" style="display:none;">
            
        </div>
        
        <!--
        <div class="to-answer-quiz">
        -->
        <div class="row" id="div_answer_quiz" style="width:60%;margin-top:2rem;" style="display:none;">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                <button class="btn-lg btn-success form-control required" id="btn_yes" style="height:4rem;line-height:4rem;">
                    <h3>YES</h3>
                </button>
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                <button class="btn-lg btn-danger form-control required" id="btn_no" style="height:4rem;line-height:4rem;">
                    <h3>NO</h3>
                </button>
                </div>
            </div>
        </div>
        <!--
        </div>
        -->
    </div>
    <!--
    <p id="status">Not Connected</p>
    -->
    <p id="transcript" style="width:100%;display:none;"></p>
</body>
</html>
<script src="<?php echo base_url(); ?>assets/flight/js/flight.js"></script>
<script language="javascript">
    
</script>