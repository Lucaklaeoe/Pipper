SELECT
    p.post_id,
    u.name,
    u.avatar,
    p.content,
    p.created_at,
    COUNT(l.like_id) AS likes
FROM
    posts p
JOIN
    users u ON p.user_id = u.user_id
LEFT JOIN
    likes l ON p.post_id = l.post_id
GROUP BY
    p.post_id, u.name, u.avatar, p.content, p.created_at;
