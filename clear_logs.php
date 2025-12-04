<?php
/**
 * @param array $files 
 * @return array 
 */
function clearLogFiles(array $files) {
    $results = [];
    foreach ($files as $file) {
        if (file_exists($file)) {
            $success = @file_put_contents($file, '', LOCK_EX);
            if ($success === false) {
                $handle = @fopen($file, 'w');
                if ($handle) {
                    @ftruncate($handle, 0);
                    @fclose($handle);
                    $results[$file] = true;
                } else {
                    $results[$file] = false;
                }
            } else {
                $results[$file] = true;
            }
        } else {
            $results[$file] = true;
        }
    }
    return $results;
}

$logs = ['events_immediate.log', 'events_batch.log'];
$results = clearLogFiles($logs);
header('Content-Type: application/json');
if (!in_array(false, $results, true)) {
    echo json_encode(['status' => 'success', 'message' => 'All log files cleared.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to clear some files.', 'details' => $results]);
}
?>