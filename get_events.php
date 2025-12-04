<?php
header('Content-Type: application/json');

$immediateFile = 'events_immediate.log';
$batchFile = 'events_batch.log';

$results = [
    'immediate' => [],
    'batch' => []
];
function readJsonLines($file, $key) {
    global $results;
    if (file_exists($file)) {
        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $results[$key][] = json_decode($line, true);
        }
    }
}
readJsonLines($immediateFile, 'immediate');
readJsonLines($batchFile, 'batch');
echo json_encode($results);
?>