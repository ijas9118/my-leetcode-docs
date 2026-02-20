function findCircleNum(isConnected: number[][]): number {
    let n = isConnected.length;
    let provinces = 0;
    let visited: boolean[] = new Array(n).fill(false);

    for (let i = 0; i < n; i++) 
        if (!visited[i]) {
            dfs(i);
            provinces++;
        }

    function dfs(city: number) {
        visited[city] = true;

        for (let neighbor = 0; neighbor < n; neighbor++) 
            if (isConnected[city][neighbor] === 1 && !visited[neighbor])
                dfs(neighbor)
    }

    return provinces;
};