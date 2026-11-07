<?php
header('Content-Type: application/json');

function getCpuUsage() {
    $stat1 = @file('/proc/stat');
    if (!$stat1 || !isset($stat1[0])) return 0;
    $info1 = explode(" ", preg_replace("!cpu +!", "", $stat1[0]));
    $total1 = array_sum($info1);
    $idle1 = $info1[3] ?? 0;

    usleep(100000); // 100ms pause

    $stat2 = @file('/proc/stat');
    if (!$stat2 || !isset($stat2[0])) return 0;
    $info2 = explode(" ", preg_replace("!cpu +!", "", $stat2[0]));
    $total2 = array_sum($info2);
    $idle2 = $info2[3] ?? 0;

    $totalDiff = $total2 - $total1;
    $idleDiff = $idle2 - $idle1;

    return $totalDiff > 0 ? round((($totalDiff - $idleDiff) / $totalDiff) * 100) : 0;
}

$cpu_percent = getCpuUsage();

$free = @shell_exec('free -m');
$free_lines = explode("\n", trim($free ?? ''));
$mem = preg_split('/\s+/', $free_lines[1] ?? '');
$mem_total = max((int)($mem[1] ?? 1), 1);
$mem_used = (int)($mem[2] ?? 0);
$mem_percent = round(($mem_used / $mem_total) * 100);

$disk_free = @disk_free_space("/") ?: 0;
$disk_total = max(@disk_total_space("/") ?: 1, 1);
$disk_percent = round((($disk_total - $disk_free) / $disk_total) * 100);

function checkPort($ip, $port) {
    $fp = @fsockopen($ip, $port, $errno, $errstr, 1.5);
    if ($fp) {
        fclose($fp);
        return "online";
    }
    return "offline";
}

$configFile = __DIR__ . '/config.php';
$exampleConfigFile = __DIR__ . '/config.example.php';

if (file_exists($configFile)) {
    $config = require $configFile;
} elseif (file_exists($exampleConfigFile)) {
    $config = require $exampleConfigFile;
} else {
    $config = [];
}

$nodes = [];
foreach ($config['nodes'] ?? [] as $key => $node) {
    $ip = $node['ip'] ?? '127.0.0.1';
    $port = (int)($node['port'] ?? 8384);
    $nodes[$key] = checkPort($ip, $port);
}

$uptime = @shell_exec('uptime -p');
$uptime_clean = $uptime ? strtok(trim($uptime), "\n") : 'N/A';

echo json_encode([
    'vps' => [
        'cpu_percent' => $cpu_percent,
        'ram_percent' => $mem_percent,
        'disk_percent' => $disk_percent,
        'uptime' => $uptime_clean
    ],
    'nodes'     => $nodes,
    'syncthing' => $nodes
]);
